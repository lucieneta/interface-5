import DropdownIconButton from '@lyra/ui/components/Button/DropdownIconButton'
import Flex from '@lyra/ui/components/Flex'
import { IconType } from '@lyra/ui/components/Icon'
import Image from '@lyra/ui/components/Image'
import Link from '@lyra/ui/components/Link'
import BaseLink from '@lyra/ui/components/Link/BaseLink'
import useIsDarkMode from '@lyra/ui/hooks/useIsDarkMode'
import React, { useCallback, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { DESKTOP_HEADER_NAV_HEIGHT, DESKTOP_LAYOUT_LARGE_WIDTH } from '@/app/constants/layout'
import { LogEvent } from '@/app/constants/logEvents'
import { PageId } from '@/app/constants/pages'
import AccountButton from '@/app/containers/common/AccountButton'
import useNetwork from '@/app/hooks/account/useNetwork'
import getAssetSrc from '@/app/utils/getAssetSrc'
import { getNavPageFromPath } from '@/app/utils/getNavPageFromPath'
import getPagePath from '@/app/utils/getPagePath'
import getTabs from '@/app/utils/getTabs'
import logEvent from '@/app/utils/logEvent'

import LayoutMoreDropdownListItems from './LayoutMoreDropdownListItems'
import LayoutPrivacyModal from './LayoutPrivacyModal'

const SIDE_WIDTH = 420

export default function LayoutDesktopNav(): JSX.Element {
  const [isDarkMode] = useIsDarkMode()
  const { pathname } = useLocation()
  const rootPage = getNavPageFromPath(pathname)
  const network = useNetwork()

  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)
  const onMoreClose = useCallback(() => setIsMoreOpen(false), [])

  return (
    <Flex
      flexDirection="column"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: DESKTOP_HEADER_NAV_HEIGHT,
        zIndex: 'topNavBar',
      }}
    >
      <Flex
        height={DESKTOP_HEADER_NAV_HEIGHT}
        sx={{
          backdropFilter: 'blur(50px)',
        }}
        justifyContent="center"
      >
        <Flex width="100%" px={12} maxWidth={DESKTOP_LAYOUT_LARGE_WIDTH}>
          <Flex alignItems="center" width={SIDE_WIDTH}>
            <BaseLink display="flex" alignItems="center" href={getPagePath({ page: PageId.Portfolio })}>
              <Image src={getAssetSrc('/images/logo.png')} height={24} width={24} />
            </BaseLink>
          </Flex>
          <Flex flexGrow={1} alignItems={'center'} justifyContent={'center'}>
            {getTabs(network).map(tab => (
              <Link
                key={tab.path}
                mr={6}
                href={tab.path}
                textVariant="bodyMedium"
                variant="secondary"
                color={rootPage !== tab.rootPageId ? 'secondaryText' : 'text'}
                onClick={() => logEvent(LogEvent.NavPortfolioTabClick)}
              >
                {tab.name}
              </Link>
            ))}
          </Flex>
          <Flex width={SIDE_WIDTH} justifyContent={'flex-end'} alignItems={'center'}>
            <AccountButton mr={2} />
            <DropdownIconButton
              isOpen={isMoreOpen}
              onClose={onMoreClose}
              onClick={() => setIsMoreOpen(true)}
              icon={IconType.MoreHorizontal}
              variant={isDarkMode ? 'static' : 'white'}
            >
              <LayoutMoreDropdownListItems onClose={onMoreClose} onClickPrivacy={() => setIsPrivacyOpen(true)} />
            </DropdownIconButton>
            <LayoutPrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
