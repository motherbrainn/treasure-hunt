interface PagePropsInterface {
  params: {
    codeId: string;
  };
}

export default function Page({ params }: PagePropsInterface) {
  console.log(params.codeId);
  return <h1>hello</h1>;
}
