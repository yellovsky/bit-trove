import type { Meta, StoryObj } from '@storybook/react';

import { Blockquote, Heading, ListItem, Paragraph, TextLink, UnorderedList } from './Typography';

const render = () => (
  <div>
    <Heading order={1}>Taxing Laughter: The Joke Tax Chronicles</Heading>
    <Paragraph>
      Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One day,
      his advisors came to him with a problem: the kingdom was running out of money.
    </Paragraph>
    <Heading order={2}>The King's Plan</Heading>
    <Paragraph>
      The king thought long and hard, and finally came up with <TextLink to="#">a brilliant plan</TextLink>: he would
      tax the jokes in the kingdom.
    </Paragraph>
    <Blockquote>
      "After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."
    </Blockquote>
    <Heading order={3}>The Joke Tax</Heading>
    <Paragraph>The king's subjects were not amused. They grumbled and complained, but the king was firm:</Paragraph>
    <UnorderedList>
      <ListItem>1st level of puns: 5 gold coins</ListItem>
      <ListItem>2nd level of jokes: 10 gold coins</ListItem>
      <ListItem>3rd level of one-liners : 20 gold coins</ListItem>
    </UnorderedList>
    As a result, people stopped telling jokes, and the kingdom fell into a gloom. But there was one person who refused
    to let the king's foolishness get him down: a court jester named Jokester.
    <Heading order={3}>Jokester's Revolt</Heading>
    <Paragraph>
      Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the
      king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop Jokester.
    </Paragraph>
    <Paragraph>
      And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they
      couldn't help but laugh. And once they started laughing, they couldn't stop.
    </Paragraph>
    <Heading order={3}>The People's Rebellion</Heading>
    <Paragraph>
      The people of the kingdom, feeling uplifted by the laughter, started to tell jokes and puns again, and soon the
      entire kingdom was in on the joke.
    </Paragraph>
    King's Treasury People's happiness Empty Overflowing Modest Satisfied Full Ecstatic The king, seeing how much
    happier his subjects were, realized the error of his ways and repealed the joke tax. Jokester was declared a hero,
    and the kingdom lived happily ever after. The moral of the story is: never underestimate the power of a good laugh
    and always be careful of bad ideas.
  </div>
);

const meta = {
  render,
  title: 'UI/Typography',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
