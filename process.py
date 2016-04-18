import os
import signal
currentPid=os.getpid()
tasks=[]
count=0;
for line in os.popen('tasklist').readlines()[3:]:
     words=line.split()
     if words[0]=='python.exe' and int(words[1])!=currentPid:
            os.kill(int(words[1]),signal.SIGTERM)
            count+=1
print('killed ',count,'processes')