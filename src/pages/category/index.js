import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();

  // Function to perform the redirection
  const redirectToHomePage = () => {
    router.push('/home'); // Replace '/home' with the actual path to your home page
  };

  return (
    <div>
      <button onClick={redirectToHomePage}>Go to Home</button>
    </div>
  );
}
