
import Podcast from "../model/podcastModel.js"
import { errorHandler } from "../utils/error.js"
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import ffmpeg from 'fluent-ffmpeg';
import ffprobe from '@ffprobe-installer/ffprobe';
import axios from 'axios';
import fs from 'fs';



ffmpeg.setFfprobePath(ffprobe.path);

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to get audio duration
const getAudioDuration = (audioUrl) => {
  return new Promise((resolve, reject) => {
    const tempFilePath = join(__dirname, 'temp_audio.mp3');

    // Step 1: Download the audio file from the given URL
    axios({
      url: audioUrl,
      method: 'GET',
      responseType: 'stream',
    })
      .then((response) => {
        const writer = fs.createWriteStream(tempFilePath);
        response.data.pipe(writer);

        writer.on('finish', () => {
          // Step 2: Use ffmpeg to analyze the file and get the duration
          ffmpeg.ffprobe(tempFilePath, (err, metadata) => {
            if (err) {
              reject(err);
            } else {
              const duration = metadata.format.duration; // Duration in seconds
              resolve(duration);
            }

            // Clean up the temporary file
            fs.unlinkSync(tempFilePath);
          });
        });

        writer.on('error', reject);
      })
      .catch(reject);
  });
};

// formatDuration
const formatDuration = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };


export const createPodcast = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403, "You are not allowed to create the podcast"))
    }

    const {audio,title,description,backgroundPicture} = req.body

    const userId = req.user.id

    const duration = await getAudioDuration(audio);

    // const durationFormat = formatDuration(duration)

    try
    {
        
        const newPodcast = new Podcast({
            audio,
            title,
            backgroundPicture,
            userId,
            description,
            duration
        })

        await newPodcast.save()

        res.status(200).json({success:true , newPodcast})
    }
    catch(error)
    {
        next(error)
    }

}


export const getPodcast = async (req,res,next) => {

    const {podcastId} = req.params

    try
    {
        const podcast = await Podcast.findById(podcastId)

        if(!podcast)
        {
            return(errorHandler(404,"podcast not found"))
        }

        res.status(200).json({success:true ,podcast})
    }
    catch(error)
    {
        next(error)
    }

}


export const getPodcasts = async (req,res,next) => {

    try
    {
        const podcasts = await Podcast.find().sort({_id:-1})


        res.status(200).json({success:true , podcasts})

    }
    catch(error)
    {
        next(error)
    }

}


export const updatePodcast = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You not allowed to update this podcast"))
    }

    const {podcastId} = req.params

    const userId = req.user.id

    try
    {
        const podcast = await Podcast.findById(podcastId)

        if(!podcast)
        {
            return next(errorHandler(404,"podcast not found"))
        }

        const updatedPodcast = await Podcast.findByIdAndUpdate(
             podcastId,
             {
                $set:{
                    title:req.body.title,
                    audio:req.body.audio,
                    backgroundPicture:req.body.backgroundPicture,
                    description:req.body.description,
                }
             },
             {new:true}
        )

        res.status(200).json({success:true ,updatedPodcast})

    }
    catch(error)
    {
        next(error)
    }

}


export const deletePodcast = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You not allowed to update this podcast"))
    }

    const {podcastId} = req.params

    const userId = req.user.id

    try
    {
        const podcast = await Podcast.findById(podcastId)

        if(!podcast)
        {
            return next(errorHandler(404,"podcast not found"))
        }

        await Podcast.findByIdAndDelete(podcastId)

        res.status(200).json({success:true , message:`${podcast.title} has been deleted`})

    }
    catch(error)
    {
        next(error)
    }

}