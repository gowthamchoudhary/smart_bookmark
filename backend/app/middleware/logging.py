from fastapi import Request
import time


async def log_request(request:Request,call_next):
    start_time = time.time()
    print(f"[info]{request.method}{request.url.path}")
    response = await call_next(request)
    process_time = time.time()-start_time
    print(f"[INFO] Completed in {process_time:.4f}s")

    return response