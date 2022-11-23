import React from "react";
import {useSelector} from "react-redux";
import Card from "../../templates/FlipCard/Card";
import { Wrap, WrapItem } from '@chakra-ui/react'
import BaseContainer from "../../components/contents/BaseContainer";

export default function Cards(props) {
  const sources = useSelector((state) => state.overviewFlashCard.sources)
  return (
    <BaseContainer>
      <Wrap>
        {sources.map((data) =>
          <WrapItem p="1">
            <Card
              termi={data.termi}
              defi={data.defi}
            />
          </WrapItem>
        )}
      </Wrap>
    </BaseContainer>
  )
}