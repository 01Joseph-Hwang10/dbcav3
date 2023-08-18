
def log(content, label="", isolate=False):
    if isolate:
        message = content
        print()
        print(message)
        print()
    else:
        message = ""
        if len(label) > 0:
            label = f"{label} : "
            message = f">> {label}{content}"
        else:
            message = f">> {content}"
        print(message)
