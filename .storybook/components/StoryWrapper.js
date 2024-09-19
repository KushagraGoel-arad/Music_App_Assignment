import { useState } from 'react'
import classNames from 'classnames'

const LinksRenderer = ({ links, type = "figma" }) => {
    // return nothing if links aren't passed
    if (!links || links?.length === 0) return (<></>)

    let url = "https://s3.eu-west-1.amazonaws.com/niice-cms/2020/09/19/5f654baf1a50dfigma.png"

    if (type === "figma") {
        url = "https://s3.eu-west-1.amazonaws.com/niice-cms/2020/09/19/5f654baf1a50dfigma.png"
    }
    else if (type === "notion") {
        url = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/1024px-Notion-logo.svg.png"
    }

    return <>
        <div className="flex space-x-2 items-center">
            <div className="p-2 bg-icy-300 rounded-lg px-3 flex items-center justify-center">
                <img className="flex-none" src={url} width="24" height="24" />
            </div>
            <div>
                {links?.map((doc,idx) => {
                    return <a key={idx} href={doc?.link || ''} target="_blank" className="font-medium text-v4-2sm">{doc?.title || ''}</a>
                })}
            </div>
        </div>
    </>
}


const RenderFilePath = ({ filePath, pathType = "file" }) => {

    const [copied, setCopied] = useState(false)

    if (!filePath) return (<></>)

    const helpText = pathType === "story" ? "Storybook Path:" : "File Path:"

    return <div>
        <div className="flex items-center space-x-2">
            <section className="text-v4-xs text-blue-500 font-medium">{helpText}</section>
            <section className="text-v4-2xs border border-red-200 bg-red-100 px-2 py-1 rounded-lg italic text-red-700">{filePath}</section>
            <div>
                <section className="text-v4-2xs text-blue-800 font-medium cursor-pointer" onClick={() => {
                    window.navigator.clipboard.writeText(filePath);
                    setCopied(true)
                    setTimeout(() => {
                        setCopied(false)
                    }
                        , 2000)
                }
                }>{copied ? 'Copied!' : 'Copy to clipboard'}</section>
            </div>
        </div>
        {/*  */}
    </div>
}

const CreateHeightTicket = () => {
    return <div className="flex items-center space-x-2">
        <div>
            <img className="flex-none" src='https://pbs.twimg.com/profile_images/1359567708594069514/DMeZl03-_400x400.jpg' width="24" height="24" />
        </div>
        <a href="https://sprinto.height.app/component-studio" target="_blank" className="font-medium text-v4-2xs">Create a ticket </a>
    </div>
}

const ReportBrokenLink = () => {
    return <div className="flex items-center space-x-2">
        <div>
            <img className="flex-none" src='https://cdn.freebiesupply.com/logos/large/2x/slack-1-logo-png-transparent.png' width="24" height="24" />
        </div>
        <a href="https://insprinto.slack.com/archives/C048P15P6KT" target="_blank" className="font-medium text-v4-2xs">Report/Discuss Issue</a>
    </div>
}


const StoryWrapper = ({ children, docs, alternate=false }) => (
    <div className={`border border-icy-300 p-4 ${classNames({'bg-white':!alternate,'bg-icy-100':alternate })} rounded-md shadow-mars`}>
        <div className="pb-8">
            {children}
        </div>

        <div className={`relative bottom-0 left-0 -m-4 p-2 px-4 border-t border-icy-400 ${classNames({'bg-white':alternate,'bg-icy-100':!alternate })} `}>

            <div className="flex space-x-4 justify-between mb-4">
                <div className="flex items-center space-x-4">
                    {/* Figma Links */}
                    <LinksRenderer links={docs?.figma} type="figma" />
                    {/* Notion Links */}
                    <LinksRenderer links={docs?.notion} type="notion" />
                </div>
                <div className="flex space-x-8">
                    <ReportBrokenLink />
                    <CreateHeightTicket />
                </div>

            </div>
            {/*  */}
            {(docs?.filePath || docs?.storyPath) && <div className='border-icy-400 border-t pt-4'>
                <RenderFilePath filePath={docs?.filePath} />
                <RenderFilePath pathType="story" filePath={docs?.storyPath} />
            </div>}

        </div>


    </div>
);

export default StoryWrapper;