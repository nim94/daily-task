import App, { Container } from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../components/reducers'
import withData from '../lib/withData';

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
    const { Component, apollo, pageProps } = this.props;
    const store = createStore(rootReducer)

    return (
      <Container>
        <Provider store={store}>
          <ApolloProvider client={apollo}>
            <Page>
              <Component {...pageProps} />
            </Page>
          </ApolloProvider>
        </Provider>
      </Container>
    );
  }
}

export default withData(AppWrap);