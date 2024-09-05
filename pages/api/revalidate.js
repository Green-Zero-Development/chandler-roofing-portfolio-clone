export default async function handler(req, res) {

  if (req.query.secret !== process.env.VERCEL_ISR) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    await res.revalidate("/");
    await res.revalidate("/" + req.query.slug);
    await res.revalidate("/commercial/" + req.query.slug);
    await res.revalidate("/residential/" + req.query.slug);
    await res.revalidate("/projects/" + req.query.slug);
    await res.revalidate("/blog/" + req.query.slug);
    await res.revalidate("/service-areas/" + req.query.slug);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
