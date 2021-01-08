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
  validateStepOne: UserRegisterStepOneResult;
  login: UserLoginResult;
};


export type MutationValidateStepOneArgs = {
  stepOneInputData: UserRegisterStepOneInput;
};


export type MutationLoginArgs = {
  loginInputData: UserLoginInput;
};

export type UserRegisterStepOneResult = UserRegisterStepOneSuccess | UserRegisterStepOneInputError;

export type UserRegisterStepOneSuccess = {
  __typename?: 'UserRegisterStepOneSuccess';
  valid: Scalars['Boolean'];
};

export type UserRegisterStepOneInputError = {
  __typename?: 'UserRegisterStepOneInputError';
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
};

export type UserRegisterStepOneInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  dateOfBirth: Scalars['String'];
  gender: Scalars['String'];
};

export type UserLoginResult = UserLoginResultSuccess | UserLoginInvalidInputError;

export type UserLoginResultSuccess = {
  __typename?: 'UserLoginResultSuccess';
  user: User;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  career: Scalars['String'];
  description: Scalars['String'];
  birthday: Scalars['DateTime'];
  gender: Scalars['String'];
  primaryImageUrn: Scalars['String'];
  secondaryImagesUrn: Array<Scalars['String']>;
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

export type ValidateStepOneMutationVariables = Exact<{
  stepOneInputData: UserRegisterStepOneInput;
}>;


export type ValidateStepOneMutation = (
  { __typename?: 'Mutation' }
  & { validateStepOne: { __typename: 'UserRegisterStepOneSuccess' } | (
    { __typename: 'UserRegisterStepOneInputError' }
    & Pick<UserRegisterStepOneInputError, 'firstName' | 'lastName' | 'gender' | 'birthday'>
  ) }
);


export const ValidateStepOneDocument = gql`
    mutation ValidateStepOne($stepOneInputData: UserRegisterStepOneInput!) {
  validateStepOne(stepOneInputData: $stepOneInputData) {
    ... on UserRegisterStepOneSuccess {
      __typename
    }
    ... on UserRegisterStepOneInputError {
      __typename
      firstName
      lastName
      gender
      birthday
    }
  }
}
    `;
export type ValidateStepOneMutationFn = Apollo.MutationFunction<ValidateStepOneMutation, ValidateStepOneMutationVariables>;

/**
 * __useValidateStepOneMutation__
 *
 * To run a mutation, you first call `useValidateStepOneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateStepOneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateStepOneMutation, { data, loading, error }] = useValidateStepOneMutation({
 *   variables: {
 *      stepOneInputData: // value for 'stepOneInputData'
 *   },
 * });
 */
export function useValidateStepOneMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ValidateStepOneMutation, ValidateStepOneMutationVariables>) {
        return ApolloReactHooks.useMutation<ValidateStepOneMutation, ValidateStepOneMutationVariables>(ValidateStepOneDocument, baseOptions);
      }
export type ValidateStepOneMutationHookResult = ReturnType<typeof useValidateStepOneMutation>;
export type ValidateStepOneMutationResult = Apollo.MutationResult<ValidateStepOneMutation>;
export type ValidateStepOneMutationOptions = Apollo.BaseMutationOptions<ValidateStepOneMutation, ValidateStepOneMutationVariables>;