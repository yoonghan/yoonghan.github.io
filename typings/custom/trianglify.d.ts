declare module "trianglify" {
function Trianglify(options:TrianglifyOptions): any;
namespace Trianglify {}
export = Trianglify;
}

interface TrianglifyOptions {
  width: number;
  height: number;
  x_colors: string;
}
