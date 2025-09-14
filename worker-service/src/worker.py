import time
from jobs.process_job import process_job

if __name__ == "__main__":
    print("Worker Service started...")
    while True:
        process_job()
        time.sleep(5)

