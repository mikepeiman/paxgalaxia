import { client } from '$lib/dgraph-client'
import { gql, request } from 'graphql-request'


const getAllTodos = gql`query MyQuery {
  queryQuote {
    author {
      name
    }
    tags {
      tag
    }
    quoteBody
  }
}
`
export const get = async () => {
  try {
    const query = getAllTodos
    await client.request(query).then((data) => {
      todos = data.queryQuote
    })
    return {
      status: 200,
      body: { todos }
    }
  } catch (error) {
    return {
      body: { error: 'There was a server error' }
    }
  }
}