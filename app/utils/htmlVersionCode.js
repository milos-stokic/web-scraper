


module.exports = data =  [
    {
        version:"HTML5",
        code:"<!doctype html>"
    },
    {
        version:"HTML 4.01 Transitional",
        code:"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">"
    },
    {
        version:"HTML 4.01 Frameset",
        code:"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\">"
    },
    {
        version:"XHTML 1.0 Strict",
        code:"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">"
    },
    {
        version:"XHTML 1.0 Transitional",
        code:"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">"
    }

];

module.exports.checkVersion = (code) => {
    var result = 'no version';
    data.forEach(element => {
        if(element.code == code)
            result = element.version;
    });
    return result;
}
//resault will be later use for jest testing