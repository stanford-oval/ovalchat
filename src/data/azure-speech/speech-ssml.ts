function getSpeechSSMLStr(text: any, style = "neutral", styleDegree = 2) {
    return `<speak version="1.0" xmlns="http:\/\/www.w3.org\/2001\/10\/synthesis" xmlns:mstts="https:\/\/www.w3.org\/2001\/mstts" xml:lang="en-US"> <voice name="en-US-JennyNeural">
        <mstts:express-as style="${style}" styledegree="${styleDegree}">
            <prosody rate="+5%">
                ${text}
            </prosody>
        </mstts:express-as>
    </voice>
    </speak>`
}

export default getSpeechSSMLStr;