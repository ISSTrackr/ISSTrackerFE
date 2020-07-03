import subprocess

def startWebserver():
    # Start Webserver at address localhost:8080 with serving directory ./ISS_Pojekt
    subprocess.call("python3 -m http.server 8080 --bind 127.0.0.1 --directory ./Frontend/",
                    shell=True)

startWebserver()