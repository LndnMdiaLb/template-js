import { apolloClient } from '../apollo-client';
import { getAddressFromSigner } from '../../ethers.service';
import { gql } from '@apollo/client/core';

const GET_PROFILES = `
  query($request: ProfileQueryRequest!) {
    profiles(request: $request) {
      items {
        id
        name
        bio
        location
        website
        twitterUrl
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        depatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          __typename
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
`;

export interface ProfilesRequest {
  profileIds?: string[];
  ownedBy?: string;
  handles?: string[];
  whoMirroredPublicationId?: string;
}

const getProfilesRequest = (request: ProfilesRequest) => {
  return apolloClient.query({
    query: gql(GET_PROFILES),
    variables: {
      request,
    },
  });
};

/*

  Get by profile ids
    profiles(request: { profileIds: ["0x01"], limit: 10 }) {
  Get by owned by
    profiles(request: { ownedBy: ["0xD020E01C0c90Ab005A01482d34B808874345FD82"], limit: 10 }) {
  Get by handles  
    profiles(request: { handles: ["josh.dev"], limit: 1 }) {
  Get by who has mirrored a publication
    profiles(request: { whoMirroredPublicationId: "0x09-0x01", limit: 10 }) {
*/

export const profiles = async (request?: ProfilesRequest) => {

  if (!request) {
    // default
    request = { ownedBy: getAddressFromSigner() };
  }

  // only showing one example to query but you can see from request
  // above you can query many
  const profilesFromProfileIds = await getProfilesRequest(request);

  // prettyJSON('profiles: result', profilesFromProfileIds.data);

  return profilesFromProfileIds.data;
};