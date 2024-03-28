const PoweredBy = () => {
  return (
    <p className="mt-4 text-xs md:text-sm text-gray-600 text-center">
      This project is a prototype for a chatbot. <br /> Built using{" "}
      <a
        className="font-medium underline text-primary"
        href="https://www.prisma.io/"
        target="_blank"
      >
        Prisma
      </a>
      ,{" "}
      <a
        className="font-medium underline text-primary"
        href="https://turso.tech/"
        target="_blank"
      >
        Turso
      </a>{" "}
      and{" "}
      <a
        className="font-medium underline text-primary"
        href="https://sdk.vercel.ai"
        target="_blank"
      >
        Vercel AI SDK
      </a>{" "}
      ・{" "}
      <a
        className="font-medium underline text-primary"
        href="https://github.com/nitishmahawar/nextjs-turso-ai-chat"
        target="_blank"
      >
        Source Code
      </a>
    </p>
  );
};

export default PoweredBy;
