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
  people: PeopleResult;
};


export type QueryPeopleArgs = {
  limit: Scalars['Float'];
};

export type MeResult = MeResultSuccess | MeResultError;

export type MeResultSuccess = {
  __typename?: 'MeResultSuccess';
  id: Scalars['String'];
  studentCode: Scalars['String'];
  firstName: Scalars['String'];
  preferences: Preferences;
};

export type Preferences = {
  __typename?: 'Preferences';
  preferedGender: Scalars['String'];
  minAge: Scalars['Int'];
  maxAge: Scalars['Int'];
  interests: Array<Scalars['String']>;
};

export type MeResultError = {
  __typename?: 'MeResultError';
  message: Scalars['String'];
};

export type PeopleResult = PeopleSuccess | MeResultError;

export type PeopleSuccess = {
  __typename?: 'PeopleSuccess';
  people: Array<Person>;
};

export type Person = {
  __typename?: 'Person';
  id: Scalars['String'];
  career: Scalars['String'];
  birthday: Scalars['DateTime'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  primaryImageUrl: Scalars['String'];
  secondaryImagesUrl: Array<Scalars['String']>;
  viewId: Scalars['String'];
  age: Scalars['Int'];
};


export type Mutation = {
  __typename?: 'Mutation';
  register: UserRegisterResult;
  login: UserLoginResult;
  updatePreferences: UpdatePreferencesResult;
};


export type MutationRegisterArgs = {
  registerInputData: UserRegisterInput;
};


export type MutationLoginArgs = {
  loginInputData: UserLoginInput;
};


export type MutationUpdatePreferencesArgs = {
  preferences: UpdatePreferencesInput;
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
  preferences: Preferences;
  age: Scalars['Int'];
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
  id: Scalars['String'];
  studentCode: Scalars['String'];
  firstName: Scalars['String'];
  preferences: Preferences;
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

export type UpdatePreferencesResult = UpdatePreferencesInputError | UpdatePreferencesSuccess | MeResultError;

export type UpdatePreferencesInputError = {
  __typename?: 'UpdatePreferencesInputError';
  preferedGender?: Maybe<Scalars['String']>;
  minAge?: Maybe<Scalars['String']>;
  maxAge?: Maybe<Scalars['String']>;
  interests?: Maybe<Scalars['String']>;
};

export type UpdatePreferencesSuccess = {
  __typename?: 'UpdatePreferencesSuccess';
  preferences: Preferences;
};

export type UpdatePreferencesInput = {
  preferedGender: Scalars['String'];
  minAge: Scalars['Int'];
  maxAge: Scalars['Int'];
  interests: Array<Scalars['String']>;
};

export type LoginMutationVariables = Exact<{
  loginInputData: UserLoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename: 'UserLoginResultSuccess' }
    & Pick<UserLoginResultSuccess, 'jwt' | 'id' | 'firstName'>
    & { preferences: (
      { __typename?: 'Preferences' }
      & Pick<Preferences, 'preferedGender' | 'minAge' | 'maxAge' | 'interests'>
    ) }
  ) | (
    { __typename: 'UserLoginInvalidInputError' }
    & Pick<UserLoginInvalidInputError, 'studentCode' | 'studentNip' | 'credentials'>
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename: 'MeResultSuccess' }
    & Pick<MeResultSuccess, 'id' | 'studentCode' | 'firstName'>
    & { preferences: (
      { __typename?: 'Preferences' }
      & Pick<Preferences, 'preferedGender' | 'minAge' | 'maxAge' | 'interests'>
    ) }
  ) | (
    { __typename: 'MeResultError' }
    & Pick<MeResultError, 'message'>
  ) }
);

export type UpdatePreferencesMutationVariables = Exact<{
  preferences: UpdatePreferencesInput;
}>;


export type UpdatePreferencesMutation = (
  { __typename?: 'Mutation' }
  & { updatePreferences: (
    { __typename: 'UpdatePreferencesInputError' }
    & Pick<UpdatePreferencesInputError, 'preferedGender' | 'minAge' | 'maxAge' | 'interests'>
  ) | (
    { __typename: 'UpdatePreferencesSuccess' }
    & { preferences: (
      { __typename?: 'Preferences' }
      & Pick<Preferences, 'preferedGender' | 'minAge' | 'maxAge' | 'interests'>
    ) }
  ) | { __typename: 'MeResultError' } }
);


export const LoginDocument = gql`
    mutation Login($loginInputData: UserLoginInput!) {
  login(loginInputData: $loginInputData) {
    __typename
    ... on UserLoginResultSuccess {
      jwt
      id
      firstName
      preferences {
        preferedGender
        minAge
        maxAge
        interests
      }
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
export const MeDocument = gql`
    query Me {
  me {
    __typename
    ... on MeResultSuccess {
      id
      studentCode
      firstName
      preferences {
        preferedGender
        minAge
        maxAge
        interests
      }
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
export const UpdatePreferencesDocument = gql`
    mutation UpdatePreferences($preferences: UpdatePreferencesInput!) {
  updatePreferences(preferences: $preferences) {
    __typename
    ... on UpdatePreferencesInputError {
      preferedGender
      minAge
      maxAge
      interests
    }
    ... on UpdatePreferencesSuccess {
      preferences {
        preferedGender
        minAge
        maxAge
        interests
      }
    }
  }
}
    `;
export type UpdatePreferencesMutationFn = Apollo.MutationFunction<UpdatePreferencesMutation, UpdatePreferencesMutationVariables>;

/**
 * __useUpdatePreferencesMutation__
 *
 * To run a mutation, you first call `useUpdatePreferencesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePreferencesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePreferencesMutation, { data, loading, error }] = useUpdatePreferencesMutation({
 *   variables: {
 *      preferences: // value for 'preferences'
 *   },
 * });
 */
export function useUpdatePreferencesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePreferencesMutation, UpdatePreferencesMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdatePreferencesMutation, UpdatePreferencesMutationVariables>(UpdatePreferencesDocument, baseOptions);
      }
export type UpdatePreferencesMutationHookResult = ReturnType<typeof useUpdatePreferencesMutation>;
export type UpdatePreferencesMutationResult = Apollo.MutationResult<UpdatePreferencesMutation>;
export type UpdatePreferencesMutationOptions = Apollo.BaseMutationOptions<UpdatePreferencesMutation, UpdatePreferencesMutationVariables>;