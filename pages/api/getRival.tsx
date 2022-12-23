import { NextApiRequest, NextApiResponse } from 'next';
import { HeroParams } from '../../components/BattleContext';

function between(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default function getRival(req: NextApiRequest, res: NextApiResponse) {
  const mockRival: HeroParams = {
    id: '2',
    name: 'Spiritblue',
    image: '/spiritblue.png',
    crystal: between(4, 9),
    power: between(15, 30),
    speed: between(200, 300),
    health: between(20, 35),
    energy: 3,
  };

  setTimeout(() => {
    res.status(200).json(mockRival);
  }, 2000);
}
