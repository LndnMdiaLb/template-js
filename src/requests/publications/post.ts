import {
  getAddressFromSigner,
  signedTypeData,
  splitSignature,
} from '../../ethers.service';

import { apolloClient } from '../apollo-client';
import { enabledCurrencies } from '../module/enabled-modules-currencies';
import { gql } from '@apollo/client/core';
import { lensHub } from '../../lens-hub';
import { uploadIpfsData } from '../ipfs';

const CREATE_POST_TYPED_DATA = `
  mutation($request: CreatePublicPostRequest!) { 
    createPostTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
            name
            type
          }
        }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        collectModule
        collectModuleData
        referenceModule
        referenceModuleData
      }
    }
  }
}
`;

//TODO typings
const createPostTypedData = (createPostTypedDataRequest: any) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_POST_TYPED_DATA),
    variables: {
      request: createPostTypedDataRequest,
    },
  });
};

export const createPost = async (profileId: string, medadataSchema: object) => {

  const currencies = await enabledCurrencies();

  const ipfsResult = await uploadIpfsData(medadataSchema);
  // console.log('create post: ipfs result', ipfsResult);

  // hard coded to make the code example clear
  const createPostRequest = {
    profileId,
    contentURI: 'ipfs://' + ipfsResult.path,
    collectModule: {
      feeCollectModule: {
        amount: {
          currency: currencies.enabledModuleCurrencies.map(
            (c: any) => c.address
          )[0],
          value: '0.000001',
        },
        recipient: getAddressFromSigner(),
        referralFee: 10.5,
      },
    },
    referenceModule: {
      followerOnlyReferenceModule: false,
    },
  };

  const result = await createPostTypedData(createPostRequest);
  // console.log('create post: createPostTypedData', result);

  const typedData = result.data.createPostTypedData.typedData;
  // console.log('create post: typedData', typedData);

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value
  );
  // console.log('create post: signature', signature);

  const { v, r, s } = splitSignature(signature);

  const tx = await lensHub.postWithSig({
    profileId: typedData.value.profileId,
    contentURI: typedData.value.contentURI,
    collectModule: typedData.value.collectModule,
    collectModuleData: typedData.value.collectModuleData,
    referenceModule: typedData.value.referenceModule,
    referenceModuleData: typedData.value.referenceModuleData,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
  console.log('create post: tx hash', tx.hash);
};