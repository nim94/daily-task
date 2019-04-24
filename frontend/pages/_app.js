import App, { Container } from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../lib/store'
import withApollo from '../lib/withApollo'; 

class AppWrap extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apolloClient, pageProps, store } = this.props;
    /* const store = createStore(rootReducer) */

    return (
      <Container>
          <ApolloProvider client={apolloClient}>
            <Provider store={store}>
              <Page>
                <Component {...pageProps} />
              </Page>
            </Provider>
          </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(withRedux(initStore)(AppWrap));