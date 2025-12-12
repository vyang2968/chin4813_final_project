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
export const CLOSING_TEXT = <>
  <Typography sx={{ fontFamily: 'inherit', color: 'inherit' }}>
    By looking into the culinary implications of the Great Leap Forward and its effects, we can see the conflict between collectivism and individuality as expressed through food culture. The government and its communes served mostly an antagonist
    towards the individuality and uniqueness of food culture, but also safeguarded the history and traditions associated with the government-selected recipies. Additionally, the famine emphasized the importance of preserved food culture and traditions.
    We'll never know what delicious and impactful dishes were lost in the Great Leap Forward, but we should ensure that we don't repeat the same mistakes in the future.
  </Typography>
</>

export const DISHES: Record<string, Dish> = {
  intro: {
    id: 'c1',
    stage: 'intro',
    name: 'Salted Duck Eggs',
    description: 'A delicate start to the meal.',
    image: '/assets/dish1.png',
    info: (
      <>
        <Typography sx={{ fontFamily: 'inherit', color: 'inherit' }}>
          Despite the existence of meat-based dishes in state-published cookbooks for canteens, there was simply not enough resources to support such an endeavor.
          By the winter of 1958, China was already beginning to run low on food, and thus these canteens were forced to use whatever resources they had available.
          The easiest way to do this was substitute vegetables for meat. Doing so has been a Chinese tradition for centuries, and it was no different in the Mao era.
        </Typography>
        <Typography sx={{ fontFamily: 'inherit', color: 'inherit' }}>
          According to a cookbook called <span style={{ fontStyle: 'italic' }}>Canteen Recipes</span>, published by Guizhou's People's Publishing House in 1959, there was "a shortage of pork production" and instead, it
          "focuses on the method of making 150 dishes with high-yield crops...instead of meat." Among those recipes was one for salted eggs that substituted sweet potatoes and a food dye
          for the egg yolk and fermented buckwheat for the egg white. After shaping the "egg", it would be steamed to become a salted duck egg.
        </Typography>
        <Typography sx={{ fontFamily: 'inherit', color: 'inherit' }}>
          When the government included recipes like the salted duck egg recipe in cookbooks, it essentially safeguarded those traditions, keeping intact the history that was associated with them.
          On the other hand, the omission of any recipe along with the ban of private kitches, almost certainly led to the quiet extinction of many family recipes.
        </Typography>
      </>
    ),
  },

  course2: {
    id: 'c2',
    stage: 'course2',
    name: 'Food-Augmented Porridge',
    description: 'Warm and comforting.',
    image: '/assets/dish2.png',
    info: (
      <Typography sx={{ fontFamily: 'inherit', color: 'inherit' }}>
        Even though it was the cadres that began and exacerbated the famine, they did not do anything to stop it. In fact, they continued to make it worse. Early into the famine, when resources were running low,
        and the canteens could only work with grains, the cadres had the audacity to falsify their production once again. This new process, called "food augmentation" (粮食食用增量法), aimed at fooling people into
        thinking that they got more food at the canteens without actually having more food. The cadres and government touted this as a scientific breakthrough to famine relief, but it was simply a cover-up.
        According to Gao Hua in <span style={{ fontStyle: 'italic' }}>Eating Bitterness: New Perspectives on China’s Great Forward and Famine</span>, canteen workers would mix partially cooked grain, grinding
        it to a paste, add yeast to it, steaming it for a short period of time, and then serving it to people. This increased the surface area and the space taken up by the individual grains, giving the appearance
        that the bowl had more food, but there was no increase in ingredients or nutrition. The workers, having believed that they ate more food, would work harder initially, but would soon feel hungry again. This servere
        malnutrition led to the prominence of edema and sicknesses all around the country.  Ironically, the collective individualism of the cadres exacerbated the famine, leading to the deaths of millions of people. Despite the
        utopian ideals that Mao painted his socialist policies to be, it was flawed collectivism that led to the famine, and it was the individualism of the people that allowed them to survive.
      </Typography>
    ),
  },
  course3: {
    id: 'c3',
    stage: 'course3',
    name: 'Sorghum Roots, Tree Bark, and Grass',
    description: 'Spicy and bold.',
    image: '/assets/dish3.png',
    info: (
      <>
        <Typography sx={{ fontFamily: 'inherit', color: 'inherit' }}>
          As the famine progressed and resources became scarce, the people's canteens became more and more useless. If they were not producing the best food before, they were now
          completely unable to produce anything at all. The canteens no longer were dependable, and the people were reverted back to their individualist methods of sustenance.
          But there would be no pork, no yams, or anything to make the recipes they once enjoyed. Instead, entire towns found themselves fighting over a singular fawn, peeling tree bark
          to eat the inner cambium, and scavenging for any edible clay. The government turned to dynastic famine relief books like 救荒本草 (Jiuhuang Bencao) and promoted recipes from
          those books to the people, calling them "wild edible resource guides" or "substitute grain manuals" (代食品).
        </Typography>
        <Typography sx={{ fontFamily: 'inherit', color: 'inherit' }}>
          By all means the famine was a tragedy, but it also sheds light on the paradox between the government's collectivist ideals and the people's individualist nature to survive.
          When times became dire, the people completely turned away from the canteens and instead reverted to the passed down traditions of their ancestors to find sustenance. Many of the
          survival strategies were not improvisations, but rather a legacy of previous generations' presevation of traditions. In this sense, the famine inadvertently demonstrates the importance
          of individualistic culinary knowledge, even amidst collectivist policies.
        </Typography>
      </>
    ),
  },
  course4: {
    id: 'c4',
    stage: 'course4',
    name: 'Humans',
    description: 'A sweet ending.', // lol
    image: '/assets/dish4.png',
    info: (
      <Typography sx={{ fontFamily: 'inherit', color: 'inherit' }}>
        Cannibalism, while not prevalent, was not unheard during the famine and exemplified the failure of collectivist policies and the emphasis of individualistic survival instincts.
        In many rural inland provinces, the goverment was unable to provide any form of assistance to the people. When the collectivist system ultimately collapsed, individuals and families
        took matters into their own hands, even if it meant restoring to cannibalism. These horrific acts were not driven by a lack of morality, but rather a desperate need to survive, highlighting
        that when times became dire, the people reverted to their individualist nature to survive, even in its most horrifying forms.
      </Typography>
    ),
  },
};
