import { Box } from "@mui/material";
import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "./LastNews.css";
import { Height } from "@mui/icons-material";

const url = 'https://vk.com/skoipt_professionalitet';


export default function LastNews({fullText = false})
{
    const [images, setImages] = useState(new Array<ReactElement>());
    const [text, setText] = useState("загрузка...");

    
	axios.get(url)
        .then((response) => 
            {
                const parser = new DOMParser();
                const htmlDoc = parser.parseFromString(response.data, 'text/html');

                let elements: Array<ReactElement> = [];
                let newText = "";
                
                /*
                * number post
                *
                * htmlDoc.querySelectorAll(".wall_post_text")[number]
                */
                let postTextEl = htmlDoc.querySelector(".wall_post_text");
                let postContentEl = postTextEl?.parentElement;


                postContentEl?.querySelectorAll("div")[1]?.querySelectorAll("img").forEach(element => {
                    if (element.classList.value.indexOf("PhotoPrimaryAttachment__imageElement") > -1 ||
                        element.classList.value.indexOf("MediaGrid__imageElement") > -1)
                    elements.push(
                        <img src={element.src} />
                    )
                });

                newText = postTextEl?.textContent ?? "";

                setText(newText);
                setImages(elements);
        })
        .catch((error) => {
            setText("не удалось загрузить");
        });

    return (
        <Box
            sx={{
                maxHeight: '300px',
                position: 'relative',
                top: '20px',
                left: '50%',
                borderRadius: '16px',
                transform: 'translate(-50%, 0)',
            }}
        >
            <Carousel
                autoPlay
                showArrows={false}
                showStatus={false}
                showIndicators={false}
                infiniteLoop
                showThumbs={false}
                stopOnHover={false}
                swipeable
                emulateTouch
            >
                {images}
            </Carousel>
            <p className="LastNews__text">
                {text}
            </p>
        </Box>
    )
}