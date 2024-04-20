import { v4 as uuidv4 } from 'uuid';
import ImageGenerator from "@/components/ImageLoader/ImageGenerator"

async function getData(id) {
    const res = await fetch(`http://localhost:3000/api/apps/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return notFound()
    }

    return res.json();
}

async function AppPage({ params }) {
    const client_id = uuidv4();
    const data = await getData(params.id);
    console.log("Got app: ", data);
    //return APPLogic(data, client_id)
    return <ImageGenerator app={data} client_id={client_id} />
};

export default AppPage;