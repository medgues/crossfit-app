import { Flex } from '@mantine/core'

export type EmptyStateProps = {
  state: string
}
const EmptyState = ({ state }: EmptyStateProps) => (
  <Flex
    justify="center"
    align="center"
    direction="row"
    wrap="nowrap"
    gap="xl"
    w="100%"
    className="h600"
    py="xl"
  >
    {state}
  </Flex>
)

export default EmptyState
