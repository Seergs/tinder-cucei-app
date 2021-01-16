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
  me: MeResult;
};

export type MeResult = MeResultSuccess | MeResultError;

export type MeResultSuccess = {
  __typename?: 'MeResultSuccess';
  id: Scalars['String'];
  studentCode: Scalars['String'];
  firstName: Scalars['String'];
};

export type MeResultError = {
  __typename?: 'MeResultError';
  message: Scalars['String'];
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
  jwt: Scalars['String'];
};

export type UserLoginInvalidInputError = {
  __typename?: 'UserLoginInvalidInputError';
  studentCode?: Maybe<Scalars['String']>;
  studentNip?: Maybe<Scalars['String']>;
  credentials?: Maybe<Scalars['String']>;
};

export type UserLoginInput = {
  studentCode: Scalars['String'];
  studentNip: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  loginInputData: UserLoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename: 'UserLoginResultSuccess' }
    & Pick<UserLoginResultSuccess, 'jwt'>
  ) | (
    { __typename: 'UserLoginInvalidInputError' }
    & Pick<UserLoginInvalidInputError, 'studentCode' | 'studentNip' | 'credentials'>
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename: 'MeResultSuccess' }
    & Pick<MeResultSuccess, 'id' | 'studentCode'>
  ) | (
    { __typename: 'MeResultError' }
    & Pick<MeResultError, 'message'>
  ) }
);

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


export const LoginDocument = gql`
    mutation Login($loginInputData: UserLoginInput!) {
  login(loginInputData: $loginInputData) {
    __typename
    ... on UserLoginResultSuccess {
      jwt
    }
    ... on UserLoginInvalidInputError {
      studentCode
      studentNip
      credentials
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInputData: // value for 'loginInputData'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    __typename
    ... on MeResultSuccess {
      id
      studentCode
    }
    ... on MeResultError {
      message
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
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