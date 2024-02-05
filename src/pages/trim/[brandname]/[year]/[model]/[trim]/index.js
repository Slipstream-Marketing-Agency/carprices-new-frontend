import axios from "axios";

export default function TrimDetailPage({ article, trim }) {
  return (
    <></>
  );
}

export async function getServerSideProps({ req, res, params }) {
  const { brandname, model, slug, year } = params;

  const buildRedirectDestination = (trimData) => {
    return `/brands/${trimData.brand.slug}/${trimData.year}/${trimData.model.slug}/${trimData.slug}`;
  }

  try {
    const resTrim = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL_OLD}trim/${model}/${slug}/${year}`
    );

    if (resTrim.status === 200) {
      return {
        redirect: {
          permanent: true,
          destination: buildRedirectDestination(resTrim.data.trim),
        },
        props: {},
      };
    }

    return {
      props: {
        trim: resTrim.data,
      },
    };
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          try {
            const redirectTrim = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL_OLD}trim/redirect`,
              {
                oldPath: `${brandname}/${year}/${model}/${slug}/`
              }
            );

            return {
              redirect: {
                permanent: true,
                destination: buildRedirectDestination(redirectTrim.data.trim),
              },
              props: {},
            };
          } catch (innerError) {
            console.error("Error during 404 redirect:", innerError);
            return {
              notFound: true,
            };
          }
        case 500:
          console.error("API server returned a 500 error:", error);
          return {
            notFound: true, // You can also consider returning an error page here
          };
        default:
          console.error("Unhandled error from API:", error);
          return {
            notFound: true,
          };
      }
    } else {
      console.error("Error without response:", error);
      return {
        notFound: true,
      };
    }
  }
}
