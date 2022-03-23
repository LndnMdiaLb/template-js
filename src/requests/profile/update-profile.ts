import { apolloClient } from '../apollo-client';
import { gql } from '@apollo/client/core';

const UPDATE_PROFILE = `
  mutation($request: UpdateProfileRequest!) { 
    updateProfile(request: $request) {
      id
  }
 }
`;

// TODO sort types!
const updateProfileRequest = (profileInfo: any) => {
  return apolloClient.mutate({
    mutation: gql(UPDATE_PROFILE),
    variables: {
      request: profileInfo,
    },
  });
};

export const updateProfile = async ({
  profileId= null,
  name= null,
  bio= null,
  location= null,
  website= null,
  twitterUrl= null,
  coverPicture= null,
}) => {

  if (!profileId) {
    throw new Error('?');
  }

  await updateProfileRequest({
    profileId,
    name,
    bio,
    location,
    website,
    twitterUrl,
    coverPicture,
  });

  // await profiles({ profileIds: [profileId] });
};