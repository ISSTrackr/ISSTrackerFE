FROM python:3.8.5

# Environment
ENV FLASK_APP=application.py

# Init
WORKDIR /usr/src/app
COPY . .

# Setup
RUN pip install -r requirements.txt
EXPOSE 5000

# Finalize
ENTRYPOINT [ "flask", "run", "--host", "0.0.0.0" ]