import psutil
import sys

ppid = -1 if len(sys.argv)<2 else int(sys.argv[1])
count = 0
if ppid != -1:
            pprocess = psutil.Process(ppid)
            children=pprocess.children(recursive=True)
            for p in children: p.kill()
            count=len(children)
print('killed ',count,'processes')