import Hashtag from "../../components/Hashtag";
import { useRouter } from "next/router"

function Index() {
  const router = useRouter();
  const {hashtag} = router.query
  return <Hashtag hashtag={hashtag}/>;
}

export default Index;
