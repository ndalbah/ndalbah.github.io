import {WindowControls} from "#components";
import {ChevronLeft, ChevronRight, Copy, MoveRight, PanelLeft, Plus, Search, Share, ShieldHalf} from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {projectPosts} from "#constants";

const Safari = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="safari" />

                <PanelLeft className="ml-10 icon"/>

                <div className="flex items-center gap-1 ml-5">
                    <ChevronLeft className="icon"/>
                    <ChevronRight className="icon"/>
                </div>

                <div className="flex-1 flex-center gap-3">
                    <ShieldHalf className="icon"/>

                    <div className="search">
                        <Search className="icon"/>

                        <input type="text" placeholder="Search or enter website name" className="flex-1"/>
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <Share className="icon"/>
                    <Plus className="icon"/>
                    <Copy className="icon"/>
                </div>
            </div>

            <div className="blog">
                <h2>My Projects</h2>

                <div className="space-y-4">
                    {projectPosts.map(({ id, image, title, date, link, description, stack }) => (
                        <div key={id} className="blog-post">
                            <img src={image} alt={title} />

                            <div className="content">
                                <div>
                                    <div className="meta">
                                        <span>{date}</span>
                                    </div>
                                    <h3>{title}</h3>
                                </div>

                                <div className="stack">
                                    <span>{stack}</span>
                                </div>

                                <p className="text-xs text-gray-500 leading-relaxed">{description}</p>

                                <a href={link} target="_blank" rel="noopener noreferrer">
                                    View on GitHub <MoveRight size={13} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;