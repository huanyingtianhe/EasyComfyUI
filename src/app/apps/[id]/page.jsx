import { v4 as uuidv4 } from 'uuid';
import AppDetails from "@/components/ImageLoader/AppDetails"

async function AppPage({ params }) {
    const client_id = uuidv4();
    //return APPLogic(data, client_id)
    return <AppDetails appId={params.id} client_id={client_id} />
};

export default AppPage;