// pages/api/cart/add.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    return res.status(200).json({ message: 'Товар успешно добавлен в корзину' });
  }

  return res.status(405).json({ message: 'Метод не разрешён' });
}
