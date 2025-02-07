import Center from '@lyra/ui/components/Center'
import Spinner from '@lyra/ui/components/Spinner'
import React from 'react'

import Page from '.'

const PageLoading = (): JSX.Element => {
  return (
    <Page>
      <Center width="100%" height="100%">
        <Spinner />
      </Center>
    </Page>
  )
}

export default PageLoading
