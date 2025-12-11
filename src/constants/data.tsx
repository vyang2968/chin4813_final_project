import React from 'react';
import { Typography } from '@mui/material';
import { Dish } from '@/types';

export const INTRO_TEXT = (
  <>
    <Typography sx={{ fontFamily: 'inherit', color: 'inherit' }}>
      In the late 1950s, the newly on an aggresive ambition to improve the economic and social status of the country by leaning heavily into socialist ideologies. Under the leadership of Chairman Mao Zedong,
      Chinese officials argued that a transformation into a modern, industrialized nation was only possible through embarcing collectiviation to an unprecedented degree. At the core of this effort was the concept of
      the people&apos;s commune, or 人民公社 (rénmín gōngshè), a massive administrative and work unit that was inteded to consolidate governance, labor, social services, and daily life into a single revolutionary entity.
    </Typography>
    <Typography sx={{ fontFamily: 'inherit', color: 'inherit' }}>
      One of the most intrusive manifestations of this policy was the eliminatino of private kitchens and the subsequent established of communcal canteens, or 食堂 (shítáng). These canteens were touted as a symbol of socialist progress,
      liberating women from household labor, improving nutrition, and increasing productivity by reducing the amount of time families spent cooking. To promote this policy, the government would pressure families into giving up their private cookware,
      saying that smelting their works would contribute to the country&apos;s steel production and demonstrate patriotism. Some families would attempt to keep their cookware by hiding it in woodstacks or rivers. Eating privately and
      traditional recipes became a symbol of resistance and counter-revolutionary sentiment
    </Typography>
    <Typography sx={{ fontFamily: 'inherit', color: 'inherit' }}>
      By the time of its implementation, the policy was deeply entangled with the political climate of the Great Leap Forward. Eager to impress officials, work units would often exaggerate production numbers which created an illusion of abundance. Kitchens gave
      out excessive portions to impress government officials, leading to a significant amount of food waste. These practices, combined with the Great Leap Forward's emphasis on agricultural production, led to a severe famine that claimed the lives of millions of Chinese people.
      Amidst these difficult times, people attempted to cook privately again, despite a risk of punishment and a lack of resources. These makeshift kitches were not acts of culinary experimentation, but rather a desperate attempt to survive.
    </Typography>
    <Typography sx={{ fontFamily: 'inherit', color: 'inherit' }}>
      In this 4 course meal, we will explore the conflict between collectivism and individuality as expressed through the food culture of the Mao era communal canteens.
    </Typography>
  </>
);
export const CLOSING_TEXT = "Thank you for dining with us. We hope you leave with a full stomach and a full heart.";

export const DISHES: Record<string, Dish> = {
  course1: {
    id: 'c1',
    stage: 'course1',
    name: 'Steamed Dumplings',
    description: 'A delicate start to the meal.',
    image: '/assets/dish1.png',
    info: 'These dumplings represent the beginning of our journey. Wrapped in delicate dough, they hide a flavorful filling, much like the hidden stories we are about to uncover...',
  },
  course2: {
    id: 'c2',
    stage: 'course2',
    name: 'Egg Drop Soup',
    description: 'Warm and comforting.',
    image: '/assets/dish2.png',
    info: 'The soup courses flows like a river. It warms the soul and prepares the palate for the richness to come. Its golden color symbolizes prosperity.',
  },
  course3: {
    id: 'c3',
    stage: 'course3',
    name: 'Kung Pao Chicken',
    description: 'Spicy and bold.',
    image: '/assets/dish3.png',
    info: 'The main course brings heat and energy. A classic dish known for its bold flavors and peanuts, representing the complex textures of life.',
  },
  course4: {
    id: 'c4',
    stage: 'course4',
    name: 'Mooncake',
    description: 'A sweet ending.',
    image: '/assets/dish4.png',
    info: 'We end with a Mooncake, a symbol of reunion and wholeness. It reminds us to cherish the time spent together at this table.',
  },
};
