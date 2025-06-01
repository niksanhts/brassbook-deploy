import asyncio
import logging
from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from app.core.auth import security
from app.config import MAX_FILE_SIZE
from app.core.compare_melodies import compare_melodies

logger = logging.getLogger(__name__)

compare_router = APIRouter(tags=["compare"])

@compare_router.post(
    "/api/v1/compare_melodies",
    summary="Compare two audio files for melody similarity",
    dependencies=[Depends(security.get_token_from_request)]
)
async def compare_melodies_route(
    file1: UploadFile = File(..., media_type="audio/mpeg"),
    file2: UploadFile = File(..., media_type="audio/webm")  # Allow WebM for file2
):
    """
    Compare two uploaded audio files to determine melody similarity.

    Args:
        file1: First audio file (must be MP3).
        file2: Second audio file (must be WebM).

    Returns:
        dict: Comparison result or error message.

    Raises:
        HTTPException: If file validation fails, file is too large, or comparison fails.
    """
    logger.info("Received request to compare melodies: %s, %s", file1.filename, file2.filename)

    try:
        # Validate file types
        if file1.content_type != "audio/mpeg":
            logger.warning("Invalid file1 type: %s", file1.content_type)
            raise HTTPException(status_code=400, detail="File1 must be an MP3 file")
        if file2.content_type not in ["audio/webm", "audio/webm;codecs=opus"]:
            logger.warning("Invalid file2 type: %s", file2.content_type)
            raise HTTPException(status_code=400, detail="File2 must be a WebM file")

        # Read file contents and validate size
        file1_content = await file1.read()
        file2_content = await file2.read()

        if len(file1_content) > MAX_FILE_SIZE:
            logger.warning("File1 too large: %s", file1.filename)
            raise HTTPException(status_code=413, detail="File1 exceeds 10MB limit")
        if len(file2_content) > MAX_FILE_SIZE:
            logger.warning("File2 too large: %s", file2.filename)
            raise HTTPException(status_code=413, detail="File2 exceeds 10MB limit")

        # Run comparison in a thread
        logger.debug("Starting melody comparison thread")
        comparison_result = await asyncio.to_thread(compare_melodies, file1_content, file2_content)

        if comparison_result is None:
            logger.error("Melody comparison returned None")
            raise HTTPException(status_code=500, detail="Error during melody comparison")

        logger.info("Melody comparison completed successfully")
        return comparison_result  # assume this is a dict

    except HTTPException:
        # Re-raise any HTTPException (400, 413, 500, etc.)
        raise
    except Exception as e:
        logger.error("Unexpected error during melody comparison: %s", str(e))
        raise HTTPException(status_code=500, detail="Internal server error")