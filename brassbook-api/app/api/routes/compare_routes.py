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
    file2: UploadFile = File(..., media_type="audio/mpeg")
):
    """
    Compare two uploaded MP3 files to determine melody similarity.

    Args:
        file1: First MP3 file to compare.
        file2: Second MP3 file to compare.

    Returns:
        dict: Comparison result or error message.

    Raises:
        HTTPException: If file validation fails, file is too large, or comparison fails.
    """
    logger.info("Received request to compare melodies: %s, %s", file1.filename, file2.filename)

    try:
        # Validate file size
        if file1.spool_max_size and file1.spool_max_size > MAX_FILE_SIZE:
            logger.warning("File1 too large: %s", file1.filename)
            raise HTTPException(status_code=413, detail="File1 exceeds 10MB limit")
        if file2.spool_max_size and file2.spool_max_size > MAX_FILE_SIZE:
            logger.warning("File2 too large: %s", file2.filename)
            raise HTTPException(status_code=413, detail="File2 exceeds 10MB limit")

        # Read file contents
        file1_content = await file1.read()
        file2_content = await file2.read()

        # Run comparison in a thread
        logger.debug("Starting melody comparison thread")
        comparison_result = await asyncio.to_thread(compare_melodies, file1_content, file2_content)

        if comparison_result is None:
            logger.error("Melody comparison returned None")
            raise HTTPException(status_code=500, detail="Error during melody comparison")

        logger.info("Melody comparison completed successfully")
        return comparison_result  # assume this is a dict

    except HTTPException:
        # re-raise any HTTPException (413, 500, etc.)
        raise
    except Exception as e:
        logger.error("Unexpected error during melody comparison: %s", str(e))
        raise HTTPException(status_code=500, detail="Internal server error")
