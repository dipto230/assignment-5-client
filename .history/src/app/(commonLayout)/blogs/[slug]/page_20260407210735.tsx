type Props = {
  params: { slug: string };
};

export default function BlogDetails({ params }: Props) {
  return <div>Blog Details: {params.slug}</div>;
}