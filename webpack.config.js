module.exports = {
plugins: [
    new webpack.DefinePlugin({
      'process.env.URL': JSON.stringify(process.env.URL),
    })
],
}