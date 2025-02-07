import Box from '@lyra/ui/components/Box'
import { CardElement } from '@lyra/ui/components/Card'
import Flex from '@lyra/ui/components/Flex'
import Text from '@lyra/ui/components/Text'
import { MarginProps } from '@lyra/ui/types'
import { AccountLyraBalances } from '@lyrafinance/lyra-js'
import React from 'react'

import { LatestRewardEpoch } from '@/app/hooks/rewards/useLatestRewardEpoch'

import RewardsTradingCard from './RewardsTradingCard'

type Props = {
  latestRewardEpochs: LatestRewardEpoch[]
  lyraBalances: AccountLyraBalances
} & MarginProps

const RewardsTradingSection = ({ latestRewardEpochs, lyraBalances, ...marginProps }: Props): CardElement => {
  const allEpochs = Object.values(latestRewardEpochs)
  return (
    <Flex flexDirection="column" mt={[6, 0]}>
      <Box px={[6, 0]} mb={5}>
        <Text mb={2} variant="title">
          Trading
        </Text>
        <Text color="secondaryText">Earn rewards through trading fee rebates.</Text>
      </Box>
      <Flex flexDirection="column" {...marginProps}>
        {allEpochs.map((latestEpochs, idx) =>
          latestEpochs ? (
            <RewardsTradingCard
              mb={idx < allEpochs.length ? 4 : 0}
              key={latestEpochs?.global.lyra.network}
              globalRewardEpoch={latestEpochs.global}
              accountRewardEpoch={latestEpochs?.account}
              lyraBalances={lyraBalances}
            />
          ) : null
        )}
      </Flex>
    </Flex>
  )
}

export default RewardsTradingSection
