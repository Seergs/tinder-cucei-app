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
  matches?: Maybe<Array<Match>>;
};


export type QueryPeopleArgs = {
  limit: Scalars['Int'];
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
  description: Scalars['String'];
  primaryImageUrl: Scalars['String'];
  secondaryImagesUrl: Array<Scalars['String']>;
  age: Scalars['Int'];
  interests: Array<Scalars['String']>;
};


export type Match = {
  __typename?: 'Match';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userOne: User;
  userTwo: User;
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
  matches: Array<Match>;
  expoPushToken: Scalars['String'];
  age: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserRegisterResult;
  login: UserLoginResult;
  updatePreferences: UpdatePreferencesResult;
  likePerson: LikeResult;
  dislikePerson: LikeResult;
  setExpoPushToken: Scalars['Boolean'];
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


export type MutationLikePersonArgs = {
  targetUserId: Scalars['String'];
};


export type MutationDislikePersonArgs = {
  targetUserId: Scalars['String'];
};


export type MutationSetExpoPushTokenArgs = {
  token: Scalars['String'];
};

export type UserRegisterResult = UserRegisterResultSuccess | UserRegisterInvalidInputError;

export type UserRegisterResultSuccess = {
  __typename?: 'UserRegisterResultSuccess';
  user: User;
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

export type LikeResult = LikeSuccess | MeResultError | UserNotFoundError;

export type LikeSuccess = {
  __typename?: 'LikeSuccess';
  view: View;
  match?: Maybe<Match>;
};

export type View = {
  __typename?: 'View';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  liked: Scalars['Boolean'];
};

export type UserNotFoundError = {
  __typename?: 'UserNotFoundError';
  message: Scalars['String'];
};

export type DislikeMutationVariables = Exact<{
  targetUserId: Scalars['String'];
}>;


export type DislikeMutation = (
  { __typename?: 'Mutation' }
  & { dislikePerson: (
    { __typename: 'LikeSuccess' }
    & { view: (
      { __typename?: 'View' }
      & Pick<View, 'liked'>
    ), match?: Maybe<(
      { __typename?: 'Match' }
      & Pick<Match, 'id'>
    )> }
  ) | (
    { __typename: 'MeResultError' }
    & Pick<MeResultError, 'message'>
  ) | (
    { __typename: 'UserNotFoundError' }
    & Pick<UserNotFoundError, 'message'>
  ) }
);

export type LikeMutationVariables = Exact<{
  targetUserId: Scalars['String'];
}>;


export type LikeMutation = (
  { __typename?: 'Mutation' }
  & { likePerson: (
    { __typename: 'LikeSuccess' }
    & { view: (
      { __typename?: 'View' }
      & Pick<View, 'liked'>
    ), match?: Maybe<(
      { __typename?: 'Match' }
      & Pick<Match, 'id'>
    )> }
  ) | (
    { __typename: 'MeResultError' }
    & Pick<MeResultError, 'message'>
  ) | (
    { __typename: 'UserNotFoundError' }
    & Pick<UserNotFoundError, 'message'>
  ) }
);

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

export type MatchesQueryVariables = Exact<{ [key: string]: never; }>;


export type MatchesQuery = (
  { __typename?: 'Query' }
  & { matches?: Maybe<Array<(
    { __typename?: 'Match' }
    & Pick<Match, 'id' | 'createdAt'>
    & { userOne: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'age' | 'firstName' | 'lastName' | 'career' | 'primaryImageUrl' | 'secondaryImagesUrl' | 'description'>
      & { preferences: (
        { __typename?: 'Preferences' }
        & Pick<Preferences, 'interests'>
      ) }
    ), userTwo: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'age' | 'career' | 'firstName' | 'lastName' | 'primaryImageUrl' | 'secondaryImagesUrl' | 'description'>
      & { preferences: (
        { __typename?: 'Preferences' }
        & Pick<Preferences, 'interests'>
      ) }
    ) }
  )>> }
);

export type SetTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type SetTokenMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setExpoPushToken'>
);

export type PeopleQueryVariables = Exact<{
  limit: Scalars['Int'];
}>;


export type PeopleQuery = (
  { __typename?: 'Query' }
  & { people: (
    { __typename: 'PeopleSuccess' }
    & { people: Array<(
      { __typename?: 'Person' }
      & Pick<Person, 'id' | 'firstName' | 'lastName' | 'career' | 'age' | 'description' | 'primaryImageUrl' | 'secondaryImagesUrl' | 'interests'>
    )> }
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


export const DislikeDocument = gql`
    mutation Dislike($targetUserId: String!) {
  dislikePerson(targetUserId: $targetUserId) {
    __typename
    ... on LikeSuccess {
      view {
        liked
      }
      match {
        id
      }
    }
    ... on UserNotFoundError {
      message
    }
    ... on MeResultError {
      message
    }
  }
}
    `;
export type DislikeMutationFn = Apollo.MutationFunction<DislikeMutation, DislikeMutationVariables>;

/**
 * __useDislikeMutation__
 *
 * To run a mutation, you first call `useDislikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDislikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dislikeMutation, { data, loading, error }] = useDislikeMutation({
 *   variables: {
 *      targetUserId: // value for 'targetUserId'
 *   },
 * });
 */
export function useDislikeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DislikeMutation, DislikeMutationVariables>) {
        return ApolloReactHooks.useMutation<DislikeMutation, DislikeMutationVariables>(DislikeDocument, baseOptions);
      }
export type DislikeMutationHookResult = ReturnType<typeof useDislikeMutation>;
export type DislikeMutationResult = Apollo.MutationResult<DislikeMutation>;
export type DislikeMutationOptions = Apollo.BaseMutationOptions<DislikeMutation, DislikeMutationVariables>;
export const LikeDocument = gql`
    mutation Like($targetUserId: String!) {
  likePerson(targetUserId: $targetUserId) {
    __typename
    ... on LikeSuccess {
      view {
        liked
      }
      match {
        id
      }
    }
    ... on UserNotFoundError {
      message
    }
    ... on MeResultError {
      message
    }
  }
}
    `;
export type LikeMutationFn = Apollo.MutationFunction<LikeMutation, LikeMutationVariables>;

/**
 * __useLikeMutation__
 *
 * To run a mutation, you first call `useLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeMutation, { data, loading, error }] = useLikeMutation({
 *   variables: {
 *      targetUserId: // value for 'targetUserId'
 *   },
 * });
 */
export function useLikeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LikeMutation, LikeMutationVariables>) {
        return ApolloReactHooks.useMutation<LikeMutation, LikeMutationVariables>(LikeDocument, baseOptions);
      }
export type LikeMutationHookResult = ReturnType<typeof useLikeMutation>;
export type LikeMutationResult = Apollo.MutationResult<LikeMutation>;
export type LikeMutationOptions = Apollo.BaseMutationOptions<LikeMutation, LikeMutationVariables>;
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
export const MatchesDocument = gql`
    query Matches {
  matches {
    id
    createdAt
    userOne {
      id
      age
      firstName
      lastName
      career
      primaryImageUrl
      secondaryImagesUrl
      description
      preferences {
        interests
      }
    }
    userTwo {
      id
      age
      career
      firstName
      lastName
      primaryImageUrl
      secondaryImagesUrl
      description
      preferences {
        interests
      }
    }
  }
}
    `;

/**
 * __useMatchesQuery__
 *
 * To run a query within a React component, call `useMatchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMatchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMatchesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMatchesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MatchesQuery, MatchesQueryVariables>) {
        return ApolloReactHooks.useQuery<MatchesQuery, MatchesQueryVariables>(MatchesDocument, baseOptions);
      }
export function useMatchesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MatchesQuery, MatchesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MatchesQuery, MatchesQueryVariables>(MatchesDocument, baseOptions);
        }
export type MatchesQueryHookResult = ReturnType<typeof useMatchesQuery>;
export type MatchesLazyQueryHookResult = ReturnType<typeof useMatchesLazyQuery>;
export type MatchesQueryResult = Apollo.QueryResult<MatchesQuery, MatchesQueryVariables>;
export const SetTokenDocument = gql`
    mutation SetToken($token: String!) {
  setExpoPushToken(token: $token)
}
    `;
export type SetTokenMutationFn = Apollo.MutationFunction<SetTokenMutation, SetTokenMutationVariables>;

/**
 * __useSetTokenMutation__
 *
 * To run a mutation, you first call `useSetTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTokenMutation, { data, loading, error }] = useSetTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useSetTokenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetTokenMutation, SetTokenMutationVariables>) {
        return ApolloReactHooks.useMutation<SetTokenMutation, SetTokenMutationVariables>(SetTokenDocument, baseOptions);
      }
export type SetTokenMutationHookResult = ReturnType<typeof useSetTokenMutation>;
export type SetTokenMutationResult = Apollo.MutationResult<SetTokenMutation>;
export type SetTokenMutationOptions = Apollo.BaseMutationOptions<SetTokenMutation, SetTokenMutationVariables>;
export const PeopleDocument = gql`
    query People($limit: Int!) {
  people(limit: $limit) {
    __typename
    ... on PeopleSuccess {
      people {
        id
        firstName
        lastName
        career
        age
        description
        primaryImageUrl
        secondaryImagesUrl
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
 * __usePeopleQuery__
 *
 * To run a query within a React component, call `usePeopleQuery` and pass it any options that fit your needs.
 * When your component renders, `usePeopleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePeopleQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePeopleQuery(baseOptions: ApolloReactHooks.QueryHookOptions<PeopleQuery, PeopleQueryVariables>) {
        return ApolloReactHooks.useQuery<PeopleQuery, PeopleQueryVariables>(PeopleDocument, baseOptions);
      }
export function usePeopleLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PeopleQuery, PeopleQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PeopleQuery, PeopleQueryVariables>(PeopleDocument, baseOptions);
        }
export type PeopleQueryHookResult = ReturnType<typeof usePeopleQuery>;
export type PeopleLazyQueryHookResult = ReturnType<typeof usePeopleLazyQuery>;
export type PeopleQueryResult = Apollo.QueryResult<PeopleQuery, PeopleQueryVariables>;
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