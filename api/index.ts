import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  me: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserRegisterResult;
  login: UserLoginResult;
};


export type MutationRegisterArgs = {
  registerInputData: UserRegisterInput;
};


export type MutationLoginArgs = {
  loginInputData: UserLoginInput;
};

export type UserRegisterResult = UserRegisterResultSuccess | UserRegisterInvalidInputError;

export type UserRegisterResultSuccess = {
  __typename?: 'UserRegisterResultSuccess';
  user: User;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  fatherLastName: Scalars['String'];
  motherLastName: Scalars['String'];
  career: Scalars['String'];
  description: Scalars['String'];
  birthday: Scalars['DateTime'];
  primaryImageUrn: Scalars['String'];
  secondaryImagesUrn: Array<Scalars['String']>;
};


export type UserRegisterInvalidInputError = {
  __typename?: 'UserRegisterInvalidInputError';
  message: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  fatherLastName?: Maybe<Scalars['String']>;
  motherLastName?: Maybe<Scalars['String']>;
  career?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['String']>;
  studentCode?: Maybe<Scalars['String']>;
  studentNip?: Maybe<Scalars['String']>;
  credentials?: Maybe<Scalars['String']>;
  campus?: Maybe<Scalars['String']>;
};

export type UserRegisterInput = {
  name: Scalars['String'];
  fatherLastName: Scalars['String'];
  motherLastName: Scalars['String'];
  career: Scalars['String'];
  description: Scalars['String'];
  dateOfBirth: Scalars['String'];
  studentCode: Scalars['String'];
  studentNip: Scalars['String'];
};

export type UserLoginResult = UserLoginResultSuccess | UserLoginInvalidInputError;

export type UserLoginResultSuccess = {
  __typename?: 'UserLoginResultSuccess';
  user: User;
};

export type UserLoginInvalidInputError = {
  __typename?: 'UserLoginInvalidInputError';
  message: Scalars['String'];
  studentCode?: Maybe<Scalars['String']>;
  studentNip?: Maybe<Scalars['String']>;
  credentials?: Maybe<Scalars['String']>;
};

export type UserLoginInput = {
  studentCode: Scalars['String'];
  studentNip: Scalars['String'];
};

export type UserRegisterMutationVariables = Exact<{
  registerInputData: UserRegisterInput;
}>;


export type UserRegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserRegisterResultSuccess' }
    & UserRegisterResultSuccessFragment
  ) | (
    { __typename?: 'UserRegisterInvalidInputError' }
    & ErrorsFragment
  ) }
);

export type ErrorsFragment = (
  { __typename?: 'UserRegisterInvalidInputError' }
  & Pick<UserRegisterInvalidInputError, 'message' | 'name' | 'fatherLastName' | 'motherLastName' | 'career' | 'description' | 'dateOfBirth' | 'studentCode' | 'studentNip' | 'credentials'>
);

export type UserRegisterResultSuccessFragment = (
  { __typename?: 'UserRegisterResultSuccess' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'name'>
  ) }
);

export const ErrorsFragmentDoc = gql`
    fragment errors on UserRegisterInvalidInputError {
  message
  name
  fatherLastName
  motherLastName
  career
  description
  dateOfBirth
  studentCode
  studentNip
  credentials
}
    `;
export const UserRegisterResultSuccessFragmentDoc = gql`
    fragment userRegisterResultSuccess on UserRegisterResultSuccess {
  user {
    name
  }
}
    `;
export const UserRegisterDocument = gql`
    mutation userRegister($registerInputData: UserRegisterInput!) {
  register(registerInputData: $registerInputData) {
    ...userRegisterResultSuccess
    ...errors
  }
}
    ${UserRegisterResultSuccessFragmentDoc}
${ErrorsFragmentDoc}`;
export type UserRegisterMutationFn = Apollo.MutationFunction<UserRegisterMutation, UserRegisterMutationVariables>;

/**
 * __useUserRegisterMutation__
 *
 * To run a mutation, you first call `useUserRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userRegisterMutation, { data, loading, error }] = useUserRegisterMutation({
 *   variables: {
 *      registerInputData: // value for 'registerInputData'
 *   },
 * });
 */
export function useUserRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UserRegisterMutation, UserRegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<UserRegisterMutation, UserRegisterMutationVariables>(UserRegisterDocument, baseOptions);
      }
export type UserRegisterMutationHookResult = ReturnType<typeof useUserRegisterMutation>;
export type UserRegisterMutationResult = Apollo.MutationResult<UserRegisterMutation>;
export type UserRegisterMutationOptions = Apollo.BaseMutationOptions<UserRegisterMutation, UserRegisterMutationVariables>;