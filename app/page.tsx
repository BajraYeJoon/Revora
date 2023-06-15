import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
});

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <main></main>
    </ApolloProvider>
  );
}
