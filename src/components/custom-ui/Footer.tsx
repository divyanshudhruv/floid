import { Flex, Text, SmartLink } from "@once-ui-system/core";

// Footer
const Footer: React.FC = () => (
  <Flex fillWidth center paddingTop="64" paddingBottom="32">
    <Text variant="label-default-s" onBackground="neutral-weak">
      Crafted in shadows by{" "}
      <SmartLink href="https://github.com/divyanshudhruv">someone unknown</SmartLink>
      {" "}☕.
    </Text>
  </Flex>
);
export default Footer;
