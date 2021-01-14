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
  studentCode: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  career: Scalars['String'];
  description: Scalars['String'];
  birthday: Scalars['DateTime'];
  gender: Scalars['String'];
  primaryImageUrl: Scalars['String'];
  secondaryImagesUrl: Array<Scalars['String']>;
};


export type UserRegisterInvalidInputError = {
  __typename?: 'UserRegisterInvalidInputError';
  studentCode?: Maybe<Scalars['String']>;
  studentNip?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  career?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  campus?: Maybe<Scalars['String']>;
  credentials?: Maybe<Scalars['String']>;
  primaryImageUrl?: Maybe<Scalars['String']>;
};

export type UserRegisterInput = {
  studentCode: Scalars['String'];
  studentNip: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  birthday: Scalars['String'];
  career: Scalars['String'];
  description: Scalars['String'];
  gender: Scalars['String'];
  primaryImageUrl: Scalars['String'];
  secondaryImagesUrl: Array<Scalars['String']>;
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

export type RegisterMutationVariables = Exact<{
  registerInputData: UserRegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename: 'UserRegisterResultSuccess' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  ) | (
    { __typename: 'UserRegisterInvalidInputError' }
    & Pick<UserRegisterInvalidInputError, 'studentCode' | 'studentNip' | 'firstName' | 'lastName' | 'birthday' | 'career' | 'description' | 'gender' | 'primaryImageUrl' | 'campus' | 'credentials'>
  ) }
);


export const RegisterDocument = gql`
    mutation Register($registerInputData: UserRegisterInput!) {
  register(registerInputData: $registerInputData) {
    __typename
    ... on UserRegisterResultSuccess {
      user {
        id
      }
    }
    ... on UserRegisterInvalidInputError {
      studentCode
      studentNip
      firstName
      lastName
      birthday
      career
      description
      gender
      primaryImageUrl
      campus
      credentials
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInputData: // value for 'registerInputData'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;