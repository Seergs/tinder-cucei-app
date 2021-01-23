import React from "react";
import { Text } from "react-native";

type ErrorProps = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<{}, ErrorProps> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Text>Algo salió mal</Text>;
    }

    return this.props.children;
  }
}
