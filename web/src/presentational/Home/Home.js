import React from 'react';
import { Card, Heading, majorScale, Pane, Text } from 'evergreen-ui';
import Grid from '../Shared/Grid';
import Row from '../Shared/Row';
import Cell from '../Shared/Cell';

const Home = () => {
  return (
    <Pane>
      <Card
        margin={majorScale(2)}
        height={'85vh'}
        background={'tint2'}
        elevation={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Heading marginBottom={majorScale(3)} size={800}>
          Welcome to
        </Heading>
        <Heading marginBottom={majorScale(3)} size={900} is={'h1'}>
          Code Quiz
        </Heading>
        <Text size={600}>Test your skill with out community driven Quiz</Text>
      </Card>

      <Grid>
        <Row>
          <Cell height={200} columns={2}>
            <Heading>Hello World</Heading>
          </Cell>
          <Cell height={200} columns={2}>
            <Heading>Hello World</Heading>
          </Cell>
          <Cell height={200} columns={2}>
            <Heading>Hello World</Heading>
          </Cell>
          <Cell height={200} columns={2}>
            <Heading>Hello World</Heading>
          </Cell>
          <Cell height={200} columns={2}>
            <Heading>Hello World</Heading>
          </Cell>
          <Cell height={200} columns={2}>
            <Heading>Hello World</Heading>
          </Cell>
        </Row>
        <Row>
          <Cell height={200} columns={4}>
            <Heading>Hello World</Heading>
          </Cell>
          <Cell height={200} columns={4}>
            <Heading>Hello World</Heading>
          </Cell>
          <Cell height={200} columns={4}>
            <Heading>Hello World</Heading>
          </Cell>
        </Row>
        <Row>
          <Cell height={200} columns={6}>
            <Heading>Hello World</Heading>
          </Cell>
          <Cell height={200} columns={6}>
            <Heading>Hello World</Heading>
          </Cell>
        </Row>
      </Grid>
    </Pane>
  );
};

export default Home;
