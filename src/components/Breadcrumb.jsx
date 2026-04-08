import { getBaseUrl } from "@/app/lib/getBaseUrl";
import getStaticText from "@/app/lib/getStaticTextServer";


const Breadcrumb = async ({ activeTitle, middleTitle, middleURL }) => {
    const staticText = await getStaticText();
    const baseUrl = await getBaseUrl(true, true);

    return (
        <ul className="breadcrumb mb-0">
            <li>
                <a href={baseUrl + "/"}>{staticText['Home']}</a>
            </li>
            {middleTitle && <li>
                <a href={middleURL}> {middleTitle}</a>
            </li>}
            <li className="active"> {activeTitle} </li>
        </ul>
    )
}

export default Breadcrumb