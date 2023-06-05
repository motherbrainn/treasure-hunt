import prisma from "../../../lib/prisma";
export const fetchCache = "force-no-store";

interface PagePropsInterface {
  params: {
    codeId: string;
  };
}

async function getData(id: string) {
  const feed = await prisma.qrCode.findMany({ where: { id: id } });
  return feed;
}

export default async function Page({ params }: PagePropsInterface) {
  console.log(params.codeId);
  const data = await getData(params.codeId);
  console.log(data);

  return <h1>{`Winner: ${data[0].winner}`}</h1>;
}
